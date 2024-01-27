import { useMantineTheme } from "@mantine/core";
import {
	DataTableColumn,
	DataTableProps,
	DataTable as MantineDataTable,
} from "mantine-datatable";
import { useEffect, useMemo, useRef, useState } from "react";


const PAGE_SIZE = 17;

export default function DataTable<T>(props: DataTableProps<T>) {
	const [page, setPage] = useState(1);
	const [fetching, setFetching] = useState(false);
	const recordsRef = useRef<Array<T>>();
	const [tableRecords, setTableRecords] = useState<Array<T>>();
	const [tableColumns, setTableColumns] = useState<DataTableColumn<T>[]>([]);
	const theme = useMantineTheme()
	const titleStyle = useMemo(() => ({ backgroundColor: theme.colors.blue[6], color: "white" }), [])

	const onPageChange = () => {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE;
		setTableRecords(recordsRef.current?.slice(from, to));
	}

	useEffect(() => {
		onPageChange();
	}, [page]);

	useEffect(() => {
		setTableColumns(props.columns ? props.columns.map((column) => ({ ...column, titleStyle })) :[]);
	}, [props.columns]);

	useEffect(() => {
		setFetching(true)
		if (props.records?.length === 0) {
			setTableRecords([]);
			setTimeout(() => {
				setFetching(false);
			}, 1000);
		} else {
			recordsRef.current = props.records;
			onPageChange();
			setFetching(false)
		}
	}, [props.records]);


	return (
		<MantineDataTable
			columns={tableColumns}
			records={tableRecords}
			totalRecords={recordsRef.current?.length}
			recordsPerPage={PAGE_SIZE}
			fetching={fetching}
			withBorder
			paginationColor={theme.colors.green[6]}
			borderColor={theme.colors.green[6]}
			borderRadius="md"
			page={page}
			idAccessor="id"
			noRecordsText="No hay datos disponibles"
			onPageChange={(p) => setPage(p)}
		/>
	);
}
