import DataTable from "react-data-table-component"
import { zip } from "@/helpers/helpers"

const ExpandedComponent = ({ data }:any) => <pre>{JSON.stringify(data, null, 2)}</pre>;

export default function ViewerCSV ({ csvData }: { csvData: string }) {
  const header = csvData.slice(0, csvData.indexOf('\n')).split(',').map(cell =>{
    return {
      name: cell,
      selector: (row:any) => row[cell],
      sortable: true
    }
  })
  const data = csvData.slice(csvData.indexOf('\n') + 1).split('\n').map(row => {
    const content = {}
    for(const [key, value] of zip(header, row.split(','))){
      // @ts-ignore
      content[key.name] = value
    }
    return content
  })

  return (
    <DataTable
			columns={header}
			data={data}
      expandableRows
      expandableRowsComponent={ExpandedComponent}
		/>
  )
}