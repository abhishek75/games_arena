import { interpolateDate } from "d3";
import { Deserializable } from "@app/shared/types";

export namespace DashboardModel {

  export interface ResultEvent {
      type: string;
      data: any;
  }

  export interface DashboardTableResponseType {
      count: number;
      has_next?: boolean;
      has_previous?: boolean;
      next: string;
      num_pages?: number;
      previous?: string;
      document_per_page?: number;
      results: DashboardDataObjectType[];
  }

  export interface SetUploadTableObjectResponse {
    message: string;
    data: DashboardDataObjectType[];
    status: boolean;
  }

  export interface DashboardDataObjectType{
    title: string;
    platform: string;
    score: number;
    genre: string;
    editors_choice: string;
    
  }

  export class DashboardDataObjectType{
    title: string = null;
    platform: string = null;
    score: number = null;
    genre: string = null;
    editors_choice: string = null;
  }
}
