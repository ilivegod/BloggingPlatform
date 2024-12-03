import React from "react";

interface countriesProps {
  country: string;
  capital: string;
}

function CountriesList({ country, capital }: countriesProps) {
  return (
    <div className="flex justify-between px-44 py-10">
      <div>
        <p>{country}</p>
      </div>
      <div>
        <p>{capital}</p>
      </div>
    </div>
  );
}

export default CountriesList;
