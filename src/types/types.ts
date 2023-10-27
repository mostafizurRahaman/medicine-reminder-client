import { MouseEvent, ChangeEvent, FormEvent } from "react";

export type ClickEventType = (e: MouseEvent<HTMLButtonElement>) => void;
export type ChangeEventType = (e: ChangeEvent<HTMLInputElement>) => void;
export type ChangeEventSelectionType = (
   e: ChangeEvent<HTMLSelectElement>
) => void;
export type onSubmitType = (e: FormEvent<HTMLFormElement>) => void;
export type deleteType = (_id: string) => void;
