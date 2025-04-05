import {PrismaClient} from '@prisma/client';
import {$fetch} from 'ofetch';
const prisma = new PrismaClient();

const productsURL = 'https://fakestoreapi.com/products';
const products = await $fetch(productsURL);

const seedProducts = async () => {
  try {
    for (const product of products) {
      await prisma.products.create({
        data: {
          title: product.title,
          description: product.description,
          image: product.image,
          category: product.category,
          price: product.price,
        },
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};
seedProducts();
