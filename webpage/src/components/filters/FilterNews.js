import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";

function FilterNews() {
  const state = useContext(GlobalState);

  const [categories] = state.categoriesAPI.sections;
  const [category, setCategory] = state.newsAPI.category;
  //const [search, setSearch] = state.newsAPI.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    //setSearch("");
  };
  return (
    <div className="input-group">
      <div className="input-group-prepend col-md-3 px-0 mt-2">
        <select
          className="custom-select text-capitalize shadow-none"
          name="category"
          value={category}
          onChange={handleCategory}
        >
          <option value="">Todas las Categorias</option>
          {categories.map((category) => (
            <option value={"category=" + category.name} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/*<div className="mt-2 col-md-8 px-0 ml-auto">
        <input
          className="form-control shadow-none"
          type="text"
          value={search}
          placeholder="Introduce tu busqueda"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
          </div>*/}
    </div>
  );
}

export default FilterNews;
