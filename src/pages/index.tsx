import type { NextPage } from "next";
import { Layout } from "@/components/layout";
import { trpc } from "@/utils/trpc";
import { RefreshIcon } from "@heroicons/react/outline";
import TrashModal from "@/components/dialog";

const URLTable = () => {
  const { data, isLoading, isError } = trpc.useQuery(["urls"], {
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
  });

  if (isError) return <div>Error...</div>;
  if (isLoading || !data)
    return (
      <div className="flex justify-center items-center">
        <RefreshIcon className="w-12 h-12 animate-spin" />
      </div>
    );

  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Link</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((url) => (
          <tr key={url.name}>
            <td>{url.name}</td>
            <td>
              <a href={url.url} className="link-secondary">
                {url.url}
              </a>
            </td>
            <td className="w-8">
              <TrashModal
                title="Are you sure?"
                desc="This action can not be undone. Please double check if you really wanna do it!"
                confirmText="Yes"
                abortText="No"
                urlId={url.id}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Home: NextPage = () => {
  return (
    <Layout
      title="Short - urls"
      desc="A list of the created urls"
      className="overflow-x-auto"
    >
      <URLTable />
    </Layout>
  );
};

export default Home;
