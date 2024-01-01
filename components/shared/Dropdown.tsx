import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { createCategory, getAllCategories } from "@/lib/actions/category.actions";

type DropdownProps = {
  value: string;
  onChangeHandler: () => void;
};

const Dropdown = ({ onChangeHandler, value }: DropdownProps) => {
  const [Category, setCategory] = useState<ICategory[]>([]);
  const [NewCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    createCategory({
      categoryName: NewCategory.trim(),
    }).then((category)=>{
      setCategory((prevState)=>([...prevState,category]));
    })
  }

  useEffect(()=>{
    const getCategories = async () =>{
      const categoryList = await getAllCategories();
      categoryList && setCategory(categoryList as ICategory[])
    };

    getCategories();
  },[])

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-feild">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {Category.length > 0 &&
          Category.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="select-item p-regular-14 "
            >
              {" "}
              {category.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-midum-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add New Category</AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input type="text"  placeholder="Category Name" className="input-field mt-3" onChange={(e)=>setNewCategory(e.target.value)} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
