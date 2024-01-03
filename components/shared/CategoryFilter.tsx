"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Value } from "@radix-ui/react-select";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {

     const [Categories, setCategories] = useState<ICategory[]>([]);
     const [searchCategory,setSearchCategory] = useState('');
     const searchParams = useSearchParams();
     const router = useRouter();

      useEffect(() => {
        const getCategories = async () => {
          const categoryList = await getAllCategories();
          categoryList && setCategories(categoryList as ICategory[]);
        };

        getCategories();
      }, []);

    //  useEffect(() => {
    //    const delayDebounceFn = setTimeout(() => {
    //      let newUrl = "";
    //      if (Categories) {
    //        newUrl = formUrlQuery({
    //          params: searchParams.toString(),
    //          key: "Category",
    //          value : searchCategory,
    //        });
    //      } else {
    //        newUrl = removeKeysFromQuery({
    //          params: searchParams.toString(),
    //          keysToRemove: ["query"],
    //        });
    //      }
    //      router.push(newUrl, { scroll: false });
    //    }, 300);

    //    return () => clearTimeout(delayDebounceFn);
    //  }, [Categories, searchParams, router]);

     const onSelectCategory = (category:string) => {
        let newUrl = "";
        if (category && category !== 'All') {
          newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: "category",
            value: category,
          });
        } else {
          newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["category"],
          });
        }
        router.push(newUrl, { scroll: false });
     }
  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-feild">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
          <SelectItem value='All' className="select-item p-regular-14" >All</SelectItem>
        {Categories.map((category) => (
          <SelectItem key={category._id} value={category.name} className="select-item p-regular-14" >{category.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
