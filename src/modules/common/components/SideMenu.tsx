
export const SideMenu = () => {

  return (
      <div
        id="menu"
        className="bg-gray-900 min-h-screen z-10 text-slate-300 w-80 left-0"
      >
        <div id="logo" className="my-4 px-6">
          {/* Title */}
          <h1 className="text-lg md:text-2xl font-bold text-white">
            Ejercicio
            <span className="text-blue-500 text-xs"> técnico</span>.
          </h1>
          <p className="text-slate-500 text-sm">
            Aplicación de Tareas.
          </p>
        </div>

        {/*  Profile */}
        <div id="profile" className="px-6 py-10">
          <p className="text-slate-500">Bienvenido,</p>
          <a href="#" className="inline-flex space-x-2 items-center">
            <span>
              <img
                className="rounded-full w-8 h-8"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlIxpRgQbM1KVLHKitt-UYuMMpLOmtryaJjH5G-TMa7zGi4YJF9btZkzZNah5OPe6z0cU&usqp=CAU"
                alt=""
              />
            </span>
            <span className="text-sm md:text-base font-bold">Usuario</span>
          </a>
      </div>
      

      {/**Logout */}
      <div className="flex items-center justify-center">
        
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md py-2 px-4 mb-4"
          onClick={() => {
            localStorage.removeItem("userId");
            localStorage.removeItem("tasksColumnInfo");
            window.location.href = "/";
          }}
        >
          Cerrar sesión
        </button>

      </div>

      </div>
  );
};
