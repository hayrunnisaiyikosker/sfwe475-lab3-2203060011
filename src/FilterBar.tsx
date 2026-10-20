export type Filter = "all" | "done" | "open";

type FilterBarProps = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
};

function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  const options: Filter[] = ["all", "done", "open"];

  return (
    <div>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onFilterChange(option)}
          style={{ fontWeight: filter === option ? "bold" : "normal" }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;