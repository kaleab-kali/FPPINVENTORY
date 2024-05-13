import mongoose, { Schema, Document } from "mongoose";

export interface CategoryInfo extends Document {
  catID?: string;
  categoryName?: string;
  unit?: string;
}

const categorySchema = new Schema<CategoryInfo>(
  {
    catID: { type: String },
    categoryName: { type: String },
    unit: { type: String },
  },
  { timestamps: true }
);

categorySchema.pre<CategoryInfo>("save", async function (next) {
  if (!this.catID) {
    const lastCategory = await Category.findOne({}, {}, { sort: { createdAt: -1 } });
    let lastcatIDNumber = 0;
    if (lastCategory && lastCategory.catID) {
      lastcatIDNumber = parseInt(lastCategory.catID.split("-")[1]);
    }
    this.catID = `CAT-${(lastcatIDNumber + 1).toString().padStart(4, "0")}`;
  }
  next();
});

const Category = mongoose.model<CategoryInfo>("Category", categorySchema);
export default Category;
