const Select = ({ options, onChange }) => {
  return (
    <select 
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={(e) => onChange(e.target.value)}
      defaultValue=''
    >
      <option value=''>Seleccione una Divisa</option>
      {
        options.map((divisa, index) => <option key={index} value={divisa}>{divisa}</option>)
      }
    </select>
  )
}

export default Select 
