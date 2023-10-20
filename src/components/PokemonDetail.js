import { faArrowLeft, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useNavigate} from 'react-router-dom';

const PokemonDetail = ({details}) => {
    const navigate = useNavigate();
 
  return (
    <>
    <div>
      <div className="relative container max-w-[1000px] mx-auto flex items-center justify-center py-10 text-center " >
        <button className="absolute top-4 left-5  text-[25px] mb-[20px]" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faHouse} />
        </button>
        <div className="p-4  border-red-700 w-[600px] shadow-2xl border-[#fcba03] rounded-lg border rounded-[12px]">
          {details && (
            <>
              <div className="text-[30px] font-bold mb-4 capitalize text-center">{details.name}</div>
              <div className="w-full flex items-center justify-center border rounded-full w-[100px] h-[100px] mx-auto mb-[30px] bg-[#fcba03]">
                <img
                  src={details.sprites.front_default}
                  alt="Front Default Sprite"
                  className="w-32 h-32 contain-cover"
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col">
                <h3 class="font-bold mb-2 p-1 bg-[#fcba03] ">Abilities</h3>
                  <ul>
                    {details.abilities.map((ability, index) => (
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
                  {details.stats.map((stat, index) => (
                    <li key={index}>
                      {`Stat ${index + 1}: Base Stat: ${stat.base_stat}, Effort: ${stat.effort}`}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-2 p-1 bg-[#fcba03]">Types</h3>
                <ul>
                  {details.types.map((type, index) => (
                    <li key={index}>{`Type ${index + 1}: ${type.type.name}`}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-2 p-1 bg-[#fcba03]">Weight</h3>
                <span>{details.weight}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  </>
  )
}

export default PokemonDetail