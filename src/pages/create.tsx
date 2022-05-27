import { Layout } from "@/components/layout";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

const CreatePage = () => {
  const [inputs, setInputs] = useState({ name: "", url: "" });

  const trpcContext = trpc.useContext();
  const urlMutation = trpc.useMutation("addUrl", {
    onSuccess(data) {
      setInputs({ name: "", url: "" });
      trpcContext.invalidateQueries("urls");

      const previousUrls = trpcContext.getQueryData(["urls"]) || [];
      console.log(previousUrls);
      trpcContext.setQueryData(["urls"], [...previousUrls, data]);
    },
  });

  return (
    <Layout
      className="flex flex-col space-y-4"
      title="Short - create"
      desc="create new short urls"
    >
      <input
        className="input input-bordered input-primary"
        placeholder="name"
        value={inputs.name}
        onChange={(e) =>
          setInputs((p) => {
            return { ...p, name: e.target.value };
          })
        }
      />
      <input
        className="input input-bordered input-primary"
        placeholder="url"
        value={inputs.url}
        onChange={(e) =>
          setInputs((p) => {
            return { ...p, url: e.target.value };
          })
        }
      />
      <button
        className="btn btn-primary"
        onClick={() => urlMutation.mutate(inputs)}
      >
        clickme
      </button>
    </Layout>
  );
};

export default CreatePage;
