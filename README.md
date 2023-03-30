# React Endless Scrolling

`react-endless-scrolling` is a React component for efficiently implementing infinite scrolling in large data sets without sacrificing application performance.

## Installation

Install the package using npm:

```
npm install react-endless-scrolling
```

## Usage

To use the `InfiniteScroll` component, simply import it from the package and wrap your list or data set with it.

Here's a basic example:

```javascript
import React, { useState, useCallback } from 'react';
import InfiniteScroll from 'react-endless-scrolling';

const fetchImages = async (page) => {
  const response = await fetch(`https://api.unsplash.com/photos?client_id=YOUR_UNSPLASH_ACCESS_KEY&page=${page}&per_page=10`);
  const data = await response.json();
  return data;
};

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMoreImages = useCallback(async () => {
    const newImages = await fetchImages(page);
    if (newImages.length === 0) {
      setHasMore(false);
    } else {
      setImages((prevImages) => [...prevImages, ...newImages]);
      setPage((prevPage) => prevPage + 1);
    }
  }, [page]);

  return (
    <InfiniteScroll
      hasMore={hasMore}
      loadMore={loadMoreImages}
      onNewItem={() => console.log('New image added')}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <<div key={image.id} style={{ width: 'calc(33.33% - 10px)', margin: '5px' }}>>
            <img src={image.urls.small} alt={image.description} style={{ width: '100%', height: 'auto' }} />
          <</div>>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ImageGallery;

```

## Props
| Prop      | Type     | Default | Description                                                                                       |
| --------- | -------- | ------- | ------------------------------------------------------------------------------------------------- |
| children  | node     | -       | The content to be rendered inside the infinite scroll container.                                  |
| hasMore   | bool     | -       | A boolean indicating whether there are more items to load.                                        |
| loadMore  | function | -       | A function to be called when more items need to be loaded.                                        |
| onNewItem | function | null    | An optional function to be called when a new item is added to the list.                           |
| threshold | number   | 250     | The distance (in pixels) from the bottom of the scroll container at which `loadMore` is triggered.|
