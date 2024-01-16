import { resolve } from "path";
import { prisma } from "../src/libs/prisma";
import { FakeStoreResponse } from "../src/types/interfaces";

const main = async () => {
  try {
    const resp = await createNewCategories();
    console.log(resp);
  } catch (error) {
    console.error(error);
  }
  setTimeout(async () => {
    const resp = await createNewProducts();
    console.log(resp);
  }, 2000);
};

const createNewCategories = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await fetch("https://fakestoreapi.com/products");
      const products: FakeStoreResponse[] = await resp.json();
      const categories = products.map((product) => {
        return {
          name: product.category,
        };
      });
      await prisma.category.createMany({
        data: categories,
        skipDuplicates: true,
      });
      resolve("categorias creadas");
    } catch (error) {
      reject(error);
    }
  });
};

const createNewProducts = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await fetch("https://fakestoreapi.com/products");
      const products: FakeStoreResponse[] = await resp.json();
      const findCategories = await prisma.category.findMany();
      const productData = findCategories.flatMap((category) => {
        return products
          .map((product) => {
            if (category.name === product.category) {
              return {
                name: product.title,
                description: product.description,
                price: product.price,
                image: product.image,
                category_id: category.id,
              };
            }
          })
          .filter(Boolean);
      });

      productData.map(async (product) => {
        await prisma.product.create({
          data: {
            name: product?.name!,
            description: product?.description!,
            price: product?.price!,
            image: product?.image!,
            category_id: product?.category_id!,
          },
        });
      });

      resolve("productos creados");
    } catch (error) {
      reject(error);
    }
  });
};

main();
