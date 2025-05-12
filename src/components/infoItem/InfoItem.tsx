import { FC } from "react";

interface InfoItemProps {
  label: string;
  value?: string | number;
}

export const InfoItem: FC<InfoItemProps> = ({ label, value }) => {
  if (!value) return null;
  return (
    <p>
      <strong>{label}: </strong>
      <span className="value">{value}</span>
    </p>
  );
};
