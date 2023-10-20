
import React from 'react';

const PokemonCompare = ({ details }) => {
  if (!details || !details.name) {
    return <p>No data available.</p>;
  }

  return (
    <div>
      <div className="relative container w-full max-w-[400px] mx-auto flex items-center justify-center py-10 text-center ">
        <div className="p-4 border-red-700 w-full shadow-2xl rounded-lg  border-[#fcba03] rounded-lg border rounded-[12px]">
          <div className="text-[30px] font-bold mb-4 capitalize text-center">{details.name} </div>
          <div className="w-full flex items-center justify-center border rounded-full w-[100px] h-[100px] mx-auto mb-[30px] bg-[#fcba03]">
            <img
              src={details.sprites?.front_default || ''} // Optional chaining to prevent errors
              alt="Front Default Sprite"
              className="w-32 h-32 object-cover "
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <h3 className="font-bold mb-2 p-1 bg-[#fcba03]">Abilities</h3>
              <ul>
                {details.abilities?.map((ability, index) => (
                  <li key={index}>
                    {`Ability ${index + 1}: ${ability.ability.name} (Hidden: ${ability.is_hidden}, Slot: ${ability.slot})`}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold mb-2 p-1 bg-[#fcba03]">Base Experience</h3>
              <span>{details.base_experience}</span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2 p-1 bg-[#fcba03]">Stats</h3>
            <ul>
              {details.stats?.map((stat, index) => (
                <li key={index}>
                  {`Stat ${index + 1}: Base Stat: ${stat.base_stat}, Effort: ${stat.effort}`}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2 p-1 bg-[#fcba03]">Types</h3>
            <ul>
              {details.types?.map((type, index) => (
                <li key={index}>{`Type ${index + 1}: ${type.type.name}`}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Weight</h3>
            <span>{details.weight}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCompare;
