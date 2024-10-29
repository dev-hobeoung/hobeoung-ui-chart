export interface TextLegendElementProps {
  label?: string;
}

export const TextLegendElement: React.FC<TextLegendElementProps> = ({ label }: TextLegendElementProps) => {
  return (
    <div>
      <span className="whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
