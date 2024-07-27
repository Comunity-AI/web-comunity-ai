import Loader from "@/components/utils/loader";
// import { useListDatasets } from "./useListDatasets";

export default function ListDatasets() {
    // const { datasets, error, status, currentPage, nextPage, prevPage } = useListDatasets();

    // if (status === 'fetching') {
    //     return <Loader />;
    // }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <div>
            <h1>Datasets</h1>
            {/* {datasets && datasets.count > 0 ? (
                <ul>
                    {datasets.results.map((dataset) => (
                        <li key={dataset.uuid}>{dataset.name}</li> // Ajusta la propiedad según tu estructura de datos
                    ))}
                </ul>
            ) : (
                <p>No datasets found</p>
            )}
            <button onClick={prevPage} disabled={currentPage === 0}>Previous</button>
            <button onClick={nextPage}>Next</button> */}
        </div>
    );
}