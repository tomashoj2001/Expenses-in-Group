export default function useDeleteLocalStorage() {
  const deleteAllLocalStorage = () => {
    localStorage.removeItem("meeting");
    localStorage.removeItem("participants");
    localStorage.removeItem("expenses");
    localStorage.removeItem("closure");
    window.location.reload();
  };

  return { deleteAllLocalStorage };
}
