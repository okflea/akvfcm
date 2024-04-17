"use client";
import { User2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormData, UserSchema } from "~/lib/types";
import FormField from "../components/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const Page = () => {
  const onSubmit = async (data: FormData) => {
    const { phone } = data;
    const isValid = phoneRegex.test(phone);
    if (!isValid) {
      setError("phone", { type: "custom", message: "Invalid Phone Number" });
    }
    if (isValid) {
      console.log(data);
      //login
      toast.success("Login Successful");
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  });
  return (
    <>
      <div className="flex h-fit items-center justify-center overflow-hidden  ">
        <div className="md:7/12 shadow-3xl w-8/12 rounded-xl bg-white lg:w-6/12">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 p-4 shadow shadow-gray-200 md:p-8">
            <User2Icon />
          </div>
          <form
            className="grid grid-cols-1 gap-4 rounded-lg bg-gradient-to-t from-slate-700 to-slate-900 p-6 py-12 md:p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="col-auto grid gap-4">
              <FormField
                type="string"
                placeholder="Phone"
                name="phone"
                register={register}
                error={errors.phone}
              />
              <button
                type="submit"
                className="submit-button rounded-lg bg-slate-100  p-3  hover:bg-slate-300 hover:ring-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
              >
                <p className="font-honk text-2xl">Submit</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
