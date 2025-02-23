import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

interface Read {
  email: string;
  id: number;
  post_id: string;
  timestamp: string;
  utm_campaign: string;
  utm_channel: string;
  utm_medium: string;
  utm_source: string;
  title: string;
  content: string;
  streak: number;
  max_streak: number;
}

interface TableProps {
  reads: Read[];
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'post_id', headerName: 'Post ID', width: 150 },
  { field: 'timestamp', headerName: 'Data da ultima Leitura', width: 200 },
  { field: 'utm_campaign', headerName: 'Campanha UTM', width: 150 },
  { field: 'utm_channel', headerName: 'Canal UTM', width: 150 },
  { field: 'utm_medium', headerName: 'Médio UTM', width: 150 },
  { field: 'utm_source', headerName: 'Fonte UTM', width: 150 },
  { field: 'streak', headerName: 'Streak', width: 100 },
  { field: 'max_streak', headerName: 'Max Streak', width: 100 },
];

const paginationModel = { page: 0, pageSize: 5 };

const Table: React.FC<TableProps> = ({ reads }) => {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={reads}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default Table;