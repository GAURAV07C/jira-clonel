"use client";
import React, { useEffect, useState } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import OrgSwitcher from "@/components/organisation/OrgSwitcher";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/app/lib/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const CreateProjectPage = () => {
  const { isLoaded: isOrgLoaded, membership } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const [admin, setAdmin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
  });


  const onSubmit = async () => {

  }

  useEffect(() => {
    if (isOrgLoaded && isUserLoaded && membership) {
      setAdmin(membership.role === "org:admin");
    }
  }, [isOrgLoaded, isUserLoaded, membership]);

  if (!isOrgLoaded || !isUserLoaded) {
    return null;
  }

  if (!admin) {
    return (
      <div>
        <span>Opps! Only Admin can create project</span>
        <OrgSwitcher />
      </div>
    );
  }

  return (
    <div className=" container mx-auto py-10">
      <h1 className="text-6xl text-center font-bold mb-8 gradient-title">
        Create New Project
      </h1>
      <form 
      className="flex flex-col space-y-4"
      
      onSubmit={handleSubmit(onSubmit)} >
        <div>
          <Input
            id="name"
            className="bg-slate-950"
            placeholder="Projct Name"
            {...register("name")}
          />
          {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.name.message)}
            </p>
          )} */}
          {errors.name?.message && (
            <p className="text-red-500 text-sm mt-1">
              {typeof errors.name.message === "string"
                ? errors.name.message
                : "Invalid error message"}
            </p>
          )}
        </div>

         <div>
          <Input
            id="name"
            className="bg-slate-950"
            placeholder="Projct Key (Ex: RCYT)"
            {...register("key")}
          />
          {errors.key && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.key.message)}
            </p>
          )}
          {/* {errors.name?.message && (
            <p className="text-red-500 text-sm mt-1">
              {typeof errors.name.message === "string"
                ? errors.name.message
                : "Invalid error message"}
            </p>
          )} */}
        </div>

        <div>
          <Textarea
            id="description"
            className="bg-slate-950 h-28"
            placeholder="Projct Description"
            {...register("description")}
          />
          
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {typeof errors.description.message === "string"
                ? errors.description.message
                : "Invalid error message"}
            </p>
          )}
        </div>
        <Button type="submit" size='lg' className="bg-blue-800 text-white" >
          Create Project
        </Button>
      </form>
    </div>
  );
};

export default CreateProjectPage;
