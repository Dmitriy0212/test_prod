import axios from "axios";

interface Posts {
  title: string;
}

const fetchPosts = async (): Promise<Posts[]> => {
  const response = await axios.get<Posts[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
};

fetchPosts().then((posts) => {
  console.log(posts[0].title);
});
