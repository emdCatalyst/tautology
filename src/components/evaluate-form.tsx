"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAtom } from "jotai";
import { FaArrowDown } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { RefObject, SetStateAction, useState } from "react";
import i18n from "@/lib/i18n";
import Parser from "@/lib/parser";
import { ResultState } from "@/lib/types";
import { Evaluator } from "@/lib/evaluate";
import { language, truthTable } from "@/lib/state";
export function EvaluateForm({
  tableRef,
}: {
  tableRef: RefObject<HTMLElement>;
}) {
  const [lang] = useAtom(language);
  const [_, setTruthTable] = useAtom(truthTable);
  const [error, setError] = useState<{
    message: string;
    clarify: React.ReactNode[] | null;
  }>({ message: "", clarify: null });
  const FormSchema = z.object({
    expression: z.string().min(3, {
      message: i18n.t("landing.form.filters.length", undefined, lang),
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      expression: "A+B",
    },
  });

  function onSubmit({ expression }: z.infer<typeof FormSchema>) {
    let result = Parser.parse(expression);
    if (result.state == ResultState.Err) {
      // result.content = result.content as { errorCode: 1 | 2 | 3 | 4 | 5 | 6; token: Operator | Operand }
      let clarify = [];
      console.log("Error position: ", result.content.token.position);
      for (let i = 0; i < expression.length; i++)
        clarify.push(
          <span
            className={
              i == result.content.token.position
                ? " text-destructive"
                : " text-foreground"
            }
          >
            {expression[i]}
          </span>
        );

      setError({
        message: `${i18n.t(
          "landing.form.errors." + result.content.errorCode,
          undefined,
          lang
        )}`,
        clarify,
      });
    } else {
      setError({ message: "", clarify: null });
      setTruthTable(
        Evaluator.buildTruthTable(result.content) as SetStateAction<
          { [key: string]: 0 | 1 }[]
        >
      );
      tableRef.current?.scrollIntoView({
        behavior: "smooth",
      });
      console.log("Truth table: ", Evaluator.buildTruthTable(result.content));
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 my-12"
      >
        <FormField
          control={form.control}
          name="expression"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className=" h-12 text-xl text-center"
                  placeholder={i18n.t(
                    "landing.form.placeholder",
                    undefined,
                    lang
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage className=" text-lg">
                {error.message}
                <br></br>
                {error.clarify ?? ""}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormDescription className="flex flex-col text-lg">
          {i18n
            .t("landing.form.desc", undefined, lang)
            .split("\n")
            .map((d, i) => (
              <span key={i}>{d}</span>
            ))}
        </FormDescription>
        <Button size={"lg"} className="" type="submit">
          <FaArrowDown /> {i18n.t("landing.form.button", undefined, lang)}
        </Button>
      </form>
    </Form>
  );
}
