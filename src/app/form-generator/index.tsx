"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { useFormStatus, useFormState } from "react-dom";
import { generateForm } from "../actions/generateForm";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Generating..." : "Generate"}
    </Button>
  );
}

const initialState: {
  message: string;
  data?: any;
} = { message: "" };

const FormGenerator = () => {
  const [state, formAction] = useFormState(generateForm, initialState);
  const [open, setOpen] = useState(false);
  console.log(state);

  const onFormCreate = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (state.message === "Success") {
      setOpen(false);
    }
  }, [state.message]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant={"ghost"} onClick={onFormCreate}>
        Create Form
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
          <DialogDescription>This is desc</DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className=" grid gap-4 py-4">
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Share what your form is about, who is it for, and what information you would like to collect. AI will do the magic"
            ></Textarea>
          </div>
          <DialogFooter>
            <SubmitButton />
            <Button variant={"link"}>Create Manually</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormGenerator;
