import { AiOutlinePlus } from "react-icons/ai";
import Swal from "sweetalert2";


interface Props {
  addColumn: (columnName: string) => Promise<void>;
}

export const ColumnAdder = ({ addColumn }: Props) => {
  
  const handleAddColumn = async () => {
    const resp = await Swal.fire({
      title: "Nueva columna",
      input: "text",
      inputLabel: "Nombre de la columna",
      inputPlaceholder: "Ingrese el nombre de la columna",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Debe de ingresar un nombre para la columna";
        }
      },
    });

    if (resp.isConfirmed && resp.value) {
      addColumn(resp.value);
    }
  };

  return (
    <button
        onClick={handleAddColumn}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center text-2xl z-50"
      >
        <AiOutlinePlus />
      </button>
  )
}
