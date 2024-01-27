import { DataTableColumn } from "mantine-datatable"
import { useMemo } from "react"
import { DataTable } from "../../components"
import { FrequencyDetail } from "../../models"



function TableFrequencyDetail({detail}: {detail:FrequencyDetail[]}) {

    

    const frecuenciaDetailColumns = useMemo<DataTableColumn<FrequencyDetail>[]>(() => [
        { accessor: "value", title: "Frecuencia", textAlignment: 'center' },
        { accessor: "count", title: "Redundancia", textAlignment: 'center' },
        { accessor: "total", title: "Total", textAlignment: 'center' },
    ], []
    )
    return (
        <DataTable columns={frecuenciaDetailColumns} records={detail} />

    )
}

export default TableFrequencyDetail