import {Table} from "@mantine/core";
import {IResource} from "../interfaces";

export default function MetadataTable({record}: {record: IResource<any, any>}) {
  return (
    <>
      <Table highlightOnHover>
        <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
        </thead>
        <tbody>
        {
          record?.attributes.metadata ?
              Object.entries(record?.attributes.metadata).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{String(value)}</td>
                  </tr>
              ))
              :
              <tr>
                <td>No metadata</td>
              </tr>
        }
        </tbody>
        </Table>
    </>
  )
}