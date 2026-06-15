require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Category = require('../models/Category');

// mygiftnurs gift-store categories — slugs must match src/lib/catalog.ts in the mygiftnurs storefront.
const categories = [
  { name: 'Personalized Gifts', slug: 'personalized', description: 'Custom-engraved, monogrammed and made-to-order gifts that turn a name, photo or date into a one-of-a-kind keepsake.', sortOrder: 1 },
  { name: 'Birthday Gifts',     slug: 'birthday',     description: 'Balloons, gift boxes, candles and treats to help celebrate another year — for every age and personality.', sortOrder: 2 },
  { name: 'Anniversary Gifts',  slug: 'anniversary',  description: 'Romantic keepsakes, photo books and jewelry that mark milestones and celebrate love that lasts.', sortOrder: 3 },
  { name: 'Gifts for Him',      slug: 'for-him',      description: 'Wallets, grooming sets, drinkware and gear picked for the men in your life.', sortOrder: 4 },
  { name: 'Gifts for Her',      slug: 'for-her',      description: 'Jewelry, candles, spa sets and personalized treasures designed to make her day.', sortOrder: 5 },
  { name: 'Graduation Gifts',   slug: 'graduation',   description: 'Memory frames, keepsake boxes and engraved gifts to celebrate the big achievement.', sortOrder: 6 },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  let created = 0, updated = 0;

  for (const cat of categories) {
    const existing = await Category.findOne({ $or: [{ slug: cat.slug }, { name: cat.name }] });

    if (existing) {
      await Category.updateOne({ _id: existing._id }, {
        $set: { name: cat.name, slug: cat.slug, description: cat.description, sortOrder: cat.sortOrder, isActive: true }
      });
      console.log(`  UPDATE: ${cat.name}`);
      updated++;
    } else {
      await Category.create({ name: cat.name, slug: cat.slug, description: cat.description, sortOrder: cat.sortOrder, isActive: true });
      console.log(`  CREATE: ${cat.name}`);
      created++;
    }
  }

  // Deactivate any old (non-gift) categories so they no longer show in the admin/storefront.
  const giftSlugs = categories.map(c => c.slug);
  const { modifiedCount: deactivated } = await Category.updateMany(
    { slug: { $nin: giftSlugs } },
    { $set: { isActive: false } }
  );

  console.log(`\nDone. Created: ${created}, Updated: ${updated}, Deactivated: ${deactivated}`);
  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });
