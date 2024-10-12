import { Badge } from "@radix-ui/themes";

// receive the status as a prop so define the interface Prop
//{
//  status: Status
// }

// Use a map object instead of the conditional chaining
//define mapping
//const statusMap: Record<status, { label: string, color: 'red' || 'green'}> = { key: value }

//<Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>

const StatusBadge = () => {
  return <Badge color="red">red</Badge>;
};

export default StatusBadge;
