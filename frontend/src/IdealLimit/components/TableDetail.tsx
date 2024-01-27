import { DataTableColumn } from "mantine-datatable"
import { useEffect, useMemo, useState } from "react"
import { DataTable } from "../../components"
import { Detail } from "../../models"



function TableDetail({detail}: {detail:Detail[]}) {
    const [listDetail, setListDetail] = useState<Detail[]>([]);

    
    useEffect(() => {
      setListDetail(detail);
      console.log(listDetail);
      
    
    }, [detail])
    
    const detailColumns = useMemo<DataTableColumn<Detail>[]>(() => [
        { accessor: "key", title: "Caracter", textAlignment: 'center' },
        { accessor: "count", title: "Redundancia", textAlignment: 'center' },
        { accessor: "frequency", title: "Frecuencia", textAlignment: 'center' },
        // { accessor: "redundancy", title: "Redundancia", textAlignment: 'center' },
    ], []
    )
    return (
        <DataTable columns={detailColumns} records={listDetail} />

    )
}

export default TableDetail