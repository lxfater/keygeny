import type { Column } from "@tanstack/react-table";

export interface ColumnButtonProps {
  column: Column<any, any>; // eslint-disable-line
}

export interface FilterElementProps {
  value: any; // eslint-disable-line
  onChange: (value: any) => void; // eslint-disable-line
}

// ---- //

export interface IResource<A, R> {
  id: string;
  type: string;
  attributes: A;
  relationships: R;
}

interface Metadata {
  [key: string]: any;
}

interface Relationship {
  links: {
    related: string;
  }
  data: {
    type: string;
    id: string;
  }
  meta: { [key: string]: string }
}

interface RelationshipCollection {
  links: {
    related: string;
  };
}

