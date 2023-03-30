import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const InfiniteScroll = ({ children, hasMore, loadMore, onNewItem, threshold }) => {
  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const options = {
      root: scrollContainerRef.current,
      rootMargin: `${threshold}px`,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];

      if (firstEntry.isIntersecting) {
        if (hasMore) {
          loadMore();
          if (onNewItem) {
            onNewItem();
          }
        }
      }
    }, options);

    observerRef.current.observe(scrollContainerRef.current);

    return () => {
      observerRef.current.disconnect();
    };
  }, [scrollContainerRef, hasMore, loadMore, onNewItem, threshold]);

  return (
    <div ref={scrollContainerRef} style={{ overflowY: 'scroll', height: '100%' }}>
      {children}
    </div>
  );
};

InfiniteScroll.propTypes = {
  children: PropTypes.node.isRequired,
  hasMore: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  onNewItem: PropTypes.func,
  threshold: PropTypes.number,
};

InfiniteScroll.defaultProps = {
  onNewItem: null,
  threshold: 250,
};

export default InfiniteScroll;