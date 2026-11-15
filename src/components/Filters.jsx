// Sort select, price range inputs and stock filter
function Filters({
  sortBy,
  onSortChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  stockFilter,
  onStockFilterChange,
})
{
  return (
    <section className="filters">
      <div className="filter-group">
        <label>Ordenar por:</label>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="name">nombre</option>
          <option value="priceAsc">precio (menor a mayor)</option>
          <option value="priceDesc">precio (mayor a menor)</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Filtrar por precio:</label>
        <input
          type="number"
          min="0"
          placeholder="Precio mínimo"
          value={minPrice}
          onChange={(e) => onMinPriceChange(e.target.value)}
        />
        <input
          type="number"
          min="0"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Filtrar por stock:</label>
        <select value={stockFilter} onChange={(e) => onStockFilterChange(e.target.value)}>
          <option value="all">Todos</option>
          <option value="inStock">Con stock</option>
          <option value="lowStock">Poco stock (menos de 20)</option>
        </select>
      </div>
    </section>
  );
}

export default Filters;
