import React from "react";
import {HttpError, useOne, useShow} from "@refinedev/core";

import {DateField, Show, useSelect} from "@refinedev/mantine";
import {Group, Loader, Table} from "@mantine/core";
import IToken from "../../interfaces/token";
import RegenerateToken from "./components/RegenerateToken";
import IProduct from "../../interfaces/product";


export const TokenShow: React.FC = () => {
  const {query: queryResult} = useShow<IToken>();
  const {data, isLoading} = queryResult;
  const record = data?.data;

  const {data: productData, isLoading: productIsLoading, isError: productIsError} = useOne<IProduct, HttpError>({
    resource: "products",
    id: record?.relationships.bearer.data.id,
  });

  if (!record || isLoading) {
    return (
      <Show>
        <Loader/>
      </Show>
    )
  }
  return (
    <Show isLoading={isLoading || productIsLoading} canEdit={false}>
      <Group>
        <RegenerateToken refetch={queryResult.refetch} />
      </Group>
      <Table highlightOnHover>
        <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Product</td>
          <td>{productData?.data.attributes.name}</td>
        </tr>
          <tr>
            <td>Kind</td>
            <td>{record?.attributes.kind}</td>
          </tr>
          <tr>
            <td>Token</td>
            <td>{record?.attributes.token}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{record?.attributes.name}</td>
          </tr>
          <tr>
            <td>Expiry</td>
            <td>{record?.attributes.expiry}</td>
          </tr>
          {/*<tr>*/}
          {/*  <td>Permissions</td>*/}
          {/*  <td>{record?.attributes.permissions?.join(", ")}</td>*/}
          {/*</tr>*/}
          <tr>
            <td>Max Activations</td>
            <td>{record?.attributes.maxActivations}</td>
          </tr>
          <tr>
            <td>Activations</td>
            <td>{record?.attributes.activations}</td>
          </tr>
          <tr>
            <td>Max Deactivations</td>
            <td>{record?.attributes.maxDeactivations}</td>
          </tr>
          <tr>
            <td>Deactivations</td>
            <td>{record?.attributes.deactivations}</td>
          </tr>
          <tr>
            <td>Created</td>
            <td><DateField value={record?.attributes.created} format={"LLL"}/></td>
          </tr>
          <tr>
            <td>Updated</td>
            <td><DateField value={record?.attributes.updated} format={"LLL"}/></td>
          </tr>
        </tbody>
      </Table>
    </Show>
);
};
