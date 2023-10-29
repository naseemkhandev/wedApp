export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  
  
  },
  {
    field: "lastupdate",
    headerName: "Last update",
    width: 125,
    
  },
  {
    field: "inviteType",
    headerName: "Invite Type",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithinviteType ${params.row.inviteType}`}>
          {params.row.inviteType}
        </div>
      );
    },
  },
];

