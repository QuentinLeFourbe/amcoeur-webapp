import {  QuestionClientData } from "@amcoeur/types";
import axios from "axios";

export const getQuestions = () => axios.get<QuestionClientData[]>("/api/questions");

export const getQuestion = (id: string) => axios.get<QuestionClientData>(`/api/questions/${id}`);

export const updateQuestion = ( questionData: QuestionClientData) =>
  axios.put<QuestionClientData>(`/api/questions/${questionData._id}`, questionData);

export const deleteQuestion = (id: string) =>
  axios.delete<QuestionClientData>(`/api/questions/${id}`);

export const createQuestion = (questionData: QuestionClientData) =>
  axios.post<QuestionClientData>(`/api/questions/`, questionData);
