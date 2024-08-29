/* /cursos
  - Admin page
    - mostra e edita informação dos tutores (professores)
    - lista de cursos criados
*/

export default function Admin({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <h1>Admin page</h1>
    </div>
  );
}
