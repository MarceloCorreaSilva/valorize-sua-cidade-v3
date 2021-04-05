/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OptionTypeBase as OptionType, ValueType } from "react-select";

import api from "../../services/api";
import ibge from "../../services/ibge";

import { Select } from "../../shared/Select";
import Leaflet from "../../components/Maps/Leaflet";

import {
  Highlighter as HighlighterProps,
  HighlighterType as HighlighterTypeProps,
  Producer as ProducerProps,
  ProducerType as ProducerTypeProps,
  Product as ProductProps,
} from "../../Props";

import data from "../../data/data.json";

// CSS
import "./styles.css";
import "leaflet/dist/leaflet.css";
import Report from "../../components/Table/Report";

interface SelectOptions {
  value: string;
  label: string;
}

interface RouteParams {
  code: string;
}

interface Filter {
  value: string;
  label: string;
}

const Home: React.FC = () => {
  const params = useParams<RouteParams>();

  const [cityCode, setCityCode] = useState(params.code || "5003900");
  const [cityName, setCityName] = useState("");
  const [cityUF, setCityUF] = useState("");

  const [highlighters, setHighlighters] = useState<HighlighterProps[]>([]);
  const [producers, setProducers] = useState<ProducerProps[]>([]);
  const [sessionProducers, setSessionProducers] = useState<ProducerProps[]>([]);
  const [highlightersTypes, setHighlightersTypes] = useState<
    HighlighterTypeProps[]
  >([]);
  const [producersTypes, setProducersTypes] = useState<ProducerTypeProps[]>([]);
  const [highlightersOptions, setHighlightersOptions] = useState<
    SelectOptions[]
  >([]);
  const [producersOptions, setProducersOptions] = useState<SelectOptions[]>([]);
  const [report, setReport] = useState(false);

  // Filters
  const [structures, setStructures] = useState<Filter[]>([]);
  const [structures2, setStructures2] = useState<Filter[]>([]);
  const [livestocks, setLivestocks] = useState<Filter[]>([]);
  // const [livestocks, setLivestocks] = useState<Filter | null>();
  const [productions, setProductions] = useState<Filter[]>([]);
  const [commercializations, setCommercializations] = useState<Filter[]>([]);
  const [coveredPlanting, setCoveredPlanting] = useState(false);
  const [irrigated, setIrrigated] = useState(false);

  useEffect(() => {
    ibge
      .get(`/municipios/${cityCode}`)
      .then((response) => {
        setCityName(response.data.nome);
        setCityUF(response.data.microrregiao.mesorregiao.UF.sigla);
      })
      .catch((error) => console.error(error));
  }, [cityCode, params.code]);

  useEffect(() => {
    api
      .get("/highlighters-types")
      .then((response) => setHighlightersTypes(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api
      .get("/producers-types")
      .then((response) => setProducersTypes(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api
      .get("/producers")
      .then((response) => setSessionProducers(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const options = highlightersTypes.map((type) => {
      return { value: String(type.id), label: type.name };
    });

    const options2 = producersTypes.map((type) => {
      return { value: String(type.id), label: type.name };
    });

    setHighlightersOptions(
      [{ value: "0", label: "--Todos--" }].concat(options)
    );
    setProducersOptions([{ value: "0", label: "--Todos--" }].concat(options2));

    // console.log({highlightersTypes, producersTypes});
  }, [highlightersTypes, producersTypes]);

  // Filters Producers
  const filterProducers = useCallback(() => {
    let producers: ProducerProps[] = sessionProducers;

    if (
      (livestocks && livestocks.length > 0) ||
      (productions && productions.length > 0)
    ) {
      let filterLivestocksAndProductions: any[] = [];
      livestocks?.map((item) =>
        filterLivestocksAndProductions.push(item.value)
      );
      productions?.map((item) =>
        filterLivestocksAndProductions.push(item.value)
      );
      console.log(filterLivestocksAndProductions);

      if (filterLivestocksAndProductions.length > 0) {
        let producersLivestocksAndProductions = producers
          .map((producer: ProducerProps) => {
            let newProducts = producer.products.filter(
              (product: ProductProps) =>
                filterLivestocksAndProductions.includes(product.name) === true
            );
            return { ...producer, products: newProducts };
          })
          .filter((producer: ProducerProps) => producer.products.length > 0);

        producers = producersLivestocksAndProductions;

        // console.log({ producers, producersLivestocksAndProductions });
      }
    }

    if (commercializations && commercializations.length > 0) {
      let filterCommercializations: any[] = [];
      filterCommercializations = commercializations.map((item) => item.value);
      //   console.log(filterCommercializations);

      let producersCommercializations = producers.filter(
        (producer: ProducerProps) => {
          return filterCommercializations.map((item) => {
            return producer.commercialization.includes(item) === true
              ? producer
              : null;
          });
        }
      );

      producers = producersCommercializations;
    }

    if (irrigated || coveredPlanting) {
      let producersIrrigatedOrCovered = producers.filter(
        (producer: ProducerProps) => {
          return (
            producer.irrigated === irrigated &&
            producer.covered_planting === coveredPlanting
          );
        }
      );

      producers = producersIrrigatedOrCovered;
    }

    return producers;
  }, [
    commercializations,
    coveredPlanting,
    irrigated,
    livestocks,
    productions,
    sessionProducers,
  ]);

  // Clear Search Form
  const handleClearSearchForm = () => {
    setStructures([]);
    setStructures2([]);
    setLivestocks([]);
    // setLivestocks(null);
    setProductions([]);
    setCommercializations([]);
    setCoveredPlanting(false);
    setIrrigated(false);

    setHighlighters([]);
    setProducers([]);
  };

  const handleSubmitSearchForm = (event: FormEvent) => {
    event.preventDefault();
    setProducers([]);
    setHighlighters([]);

    // if (structures.length > 0) {
    //   if (structures.find((structure) => structure.label === "Propriedade")) {
    //     getProducers();
    //   } else {
    //     getHighlighters();
    //   }
    // } else {
    //   getProducers();
    //   getHighlighters();
    // }

    getHighlighters();
    // getProducers();

    console.log({
      a: structures2,
      b: structures2[0],
    });

    if (structures2.length === 1 && structures2[0].value === "0") {
      // setProducers(sessionProducers);
      setProducers(filterProducers());
    } else if (structures2.length === 0) {
    } else {
      setProducers(filterProducers());
    }
  };

  const getHighlighters = () => {
    if (structures && structures.length > 0) {
      const querys: any = [];

      if (structures.length === 1 && structures[0].value === "0") {
        api.get("/highlighters").then((response) => {
          setHighlighters(response.data);
        });
      } else {
        structures.map((structure) => {
          if (structure.value !== "0") {
            return querys.push(
              api.get(`/highlighters-types/${structure.value}`)
            );
          }
          return null;
        });

        if (querys.length > 0) {
          Promise.all(querys).then((responses: Array<any>) => {
            const _highlighters: Array<HighlighterProps> = [];
            responses.map((response) =>
              _highlighters.push(...response.data.highlighters)
            );
            setHighlighters(_highlighters);
          });
        }
      }
    }
  };

  const getProducers = () => {
    if (structures2.length > 0) {
      const querys: any = [];

      if (structures2.length === 1 && structures2[0].value === "0") {
        api.get("/producers").then((response) => {
          setProducers(response.data);
        });
      } else {
        structures2.map((structure) => {
          if (structure.value !== "0") {
            return querys.push(api.get(`/producers-types/${structure.value}`));
          }
          return null;
        });

        if (querys.length > 0) {
          Promise.all(querys).then((responses: Array<any>) => {
            const _producers: Array<ProducerProps> = [];
            responses.map((response) =>
              _producers.push(...response.data.producers)
            );
            setProducers(_producers);
          });
        }
      }

      if (
        livestocks.length > 0 ||
        commercializations.length > 0 ||
        productions.length > 0 ||
        irrigated ||
        irrigated === false ||
        coveredPlanting ||
        coveredPlanting === false
      ) {
        const filterCommercializations = commercializations.map(
          (item) => item.value
        );
        const producersCommercializations = producers?.filter(
          (producer: ProducerProps) => {
            return filterCommercializations.map((item) => {
              return producer.commercialization.includes(item) === true
                ? producer
                : null;
            });
          }
        );

        const producersIrrigatedOrCovered = producersCommercializations?.filter(
          (producer: ProducerProps) => {
            return (
              producer.irrigated === irrigated &&
              producer.covered_planting === coveredPlanting
            );
          }
        );

        setProducers(producersIrrigatedOrCovered);

        // console.log({ livestocks, commercializations, productions, coveredPlanting, irrigated });
      }
    }
  };

  const openFilters = () => {
    const filters = document.getElementById("filters");
    filters?.classList.toggle("active");
  };

  return (
    <div id="page-map">
      <aside id="filters">
        <header>
          {/* <h2>{`${cityName}-${cityUF}`}</h2> */}
          <h2>Sua Cidade</h2>
          <p>#ValorizeSuaCidade</p>
        </header>

        <main>
          <form onSubmit={handleSubmitSearchForm}>
            <fieldset>
              <legend>
                <strong>Selecione o que você procura:</strong>
              </legend>

              <div className="input-block">
                <label htmlFor="structures">Estrutura geográfica...</label>
                <Select
                  name="structures"
                  placeholder=""
                  isMultiple={true}
                  value={structures}
                  options={highlightersOptions}
                  onChange={(selectedOption: ValueType<OptionType>) => {
                    setStructures(
                      selectedOption?.map((selected: OptionType) => selected)
                    );
                  }}
                />
              </div>

              <div className="input-block">
                <label htmlFor="structures2">Produtores</label>
                <Select
                  name="structures2"
                  placeholder=""
                  isMultiple={true}
                  value={structures2}
                  options={producersOptions}
                  onChange={(selectedOption: ValueType<OptionType>) => {
                    setStructures2(
                      selectedOption?.map((selected: OptionType) => selected)
                    );
                  }}
                />
              </div>

              {/* <div
                style={{
                  // border: '1px solid black',
                  width: "100%",
                  height: "250px",
                }}
              ></div> */}

              <div className="input-block">
                <label htmlFor="livestocks">Pecuária...</label>
                <Select
                  name="livestocks"
                  placeholder=""
                  isMultiple={true}
                  value={livestocks}
                  options={data.livestock}
                  onChange={(selectedOption: ValueType<OptionType>) => {
                    setLivestocks(
                      selectedOption?.map((selected: OptionType) => selected)
                    );
                  }}
                  isDisabled={
                    structures2 && structures2.length > 0 ? false : true
                  }
                />
                {/* <select
                  name="livestocks"
                  id="livestocks"
                  onBlur={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
                    setLivestocks({
                      value: ev.target.value,
                      label: ev.target.textContent || "",
                    })
                  }
                  disabled={
                    structures2 && structures2.length > 0 ? false : true
                  }
                  style={{
                    height: "42px",
                    padding: "2px 8px",
                    backgroundColor: "#FFF",
                  }}
                >
                  <option value=""></option>
                  {data.livestock.map((livestock) => (
                    <option value={livestock.value}>{livestock.label}</option>
                  ))}
                </select> */}
              </div>

              <div className="input-block">
                <label htmlFor="productions">Gêneros alimentícios...</label>
                <Select
                  name="productions"
                  placeholder=""
                  isMultiple={true}
                  value={productions}
                  options={data.production}
                  onChange={(selectedOption: ValueType<OptionType>) => {
                    setProductions(
                      selectedOption?.map((selected: OptionType) => selected)
                    );
                  }}
                  isDisabled={
                    structures2 && structures2.length > 0 ? false : true
                  }
                />
              </div>

              <div className="input-block">
                <label htmlFor="commercializations">
                  Canais de comercialização...
                </label>
                <Select
                  name="commercializations"
                  placeholder=""
                  isMultiple={true}
                  value={commercializations}
                  options={data.commercialization}
                  onChange={(selectedOption: ValueType<OptionType>) => {
                    setCommercializations(
                      selectedOption?.map((selected: OptionType) => selected)
                    );
                  }}
                  isDisabled={
                    structures2 && structures2.length > 0 ? false : true
                  }
                />
              </div>

              <div className="input-block">
                <label htmlFor="coveredPlanting">Plantio coberto</label>

                <div className="button-select">
                  <button
                    type="button"
                    className={coveredPlanting ? "active" : ""}
                    onClick={() => setCoveredPlanting(true)}
                    disabled={
                      structures2 && structures2.length > 0 ? false : true
                    }
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    className={!coveredPlanting ? "active" : ""}
                    onClick={() => setCoveredPlanting(false)}
                    disabled={
                      structures2 && structures2.length > 0 ? false : true
                    }
                  >
                    Não
                  </button>
                </div>
              </div>

              <div className="input-block">
                <label htmlFor="irrigated">Plantio Irrigado</label>

                <div className="button-select">
                  <button
                    type="button"
                    className={irrigated ? "active" : ""}
                    onClick={() => setIrrigated(true)}
                    disabled={
                      structures2 && structures2.length > 0 ? false : true
                    }
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    className={!irrigated ? "active" : ""}
                    onClick={() => setIrrigated(false)}
                    disabled={
                      structures2 && structures2.length > 0 ? false : true
                    }
                  >
                    Não
                  </button>
                </div>
              </div>

              <div className="input-block">
                <div className="buttons-actions">
                  <button className="filter-button" type="submit">
                    Filtrar
                  </button>
                  <button
                    className="reset-button"
                    type="reset"
                    onClick={handleClearSearchForm}
                  >
                    Limpar
                  </button>
                </div>
              </div>

              <div className="input-block">
                <button
                  className="filter-button"
                  type="button"
                  onClick={() => setReport(!report)}
                >
                  {report === false ? "Relatório" : "Mapa"}
                </button>
              </div>
            </fieldset>
          </form>
        </main>

        <footer>
          <strong></strong>
          <span></span>
        </footer>
      </aside>

      <button className="navbar" onClick={openFilters}>
        ☰
      </button>

      {report === false ? (
        <Leaflet
          cityCodeID={cityCode}
          producers={producers}
          highlighters={highlighters}
        />
      ) : (
        <Report producers={producers} highlighters={highlighters} />
      )}
    </div>
  );
};

export default Home;
