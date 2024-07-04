import { Tooltip } from "@nextui-org/react";
import { Pen, Trash } from "lucide-react";

const ActionCell = ( item:any, handleGetID:any, handleOpenDelete:any ) => (
  <div className="relative flex justify-end items-center gap-2 pr-5">
    <Tooltip
      content="Update"
      placement="left"
      color="primary"
      className="text-white"
    >
      <span
        className="hover:text-primary cursor-pointer"
        onClick={() => handleGetID(item.id)}
      >
        <Pen size={18} />
      </span>
    </Tooltip>
    <Tooltip
      content="Remove"
      placement="left"
      offset={34}
      color="danger"
      className="text-white"
    >
      <span
        className="hover:text-cta cursor-pointer"
        onClick={() => handleOpenDelete(item.name, item.id)}
      >
        <Trash size={18} />
      </span>
    </Tooltip>
  </div>
);

export default ActionCell;
