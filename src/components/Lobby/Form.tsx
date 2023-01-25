import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreateOrJoin } from "./CreateOrJoin";
import { Button } from "../ui/Button";

interface Props {
  createOrJoin: "create" | "join";
  setCreateOrJoin: React.Dispatch<
    React.SetStateAction<"create" | "join" | null>
  >;
}

export const Form = ({ createOrJoin, setCreateOrJoin }: Props) => {
  const schema = z.object({
    room: z
      .string()
      .min(1, { message: "Room name can't be blank" })
      .max(12, { message: "Room name must be less than 12 characters" }),
  });

  type Schema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center max-w-lg mx-auto flex-col gap-6"
    >
      <div>
        <label className="hidden" htmlFor="Enter Room Name"></label>
        <input
          className="w-full py-5 px-2 rounded outline:none focus:outline-red-400 focus:outline text-slate-900 font-medium text-center placeholder:text-slate-500"
          {...register("room")}
          type="text"
          placeholder={
            createOrJoin === "create"
              ? "Enter a new room name"
              : "Enter opponents room name"
          }
        />
        {errors?.room && (
          <p className="text-red-500 text-sm font-semibold pt-1">
            {errors.room.message}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <Button size="full" callback={() => setCreateOrJoin(null)}>
          Return
        </Button>
        <Button type="submit" size="full">
          {createOrJoin === "create" ? "Create" : "Join"}
        </Button>
      </div>
    </form>
  );
};
