const InputField = ({ id, name, type = 'text', icon, value, onChange, error, placeholder }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <fieldset className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className={`block w-full pl-10 pr-3 py-2 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
            placeholder={placeholder}
          />
        </div>
      </fieldset>
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}

export default InputField;