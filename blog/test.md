---
path: /blog/test
date: '2018-07-15'
title: test
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo est vel leo dignissim, vel volutpat ex dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus erat tortor, aliquet eu sodales vitae, porttitor eget enim. Phasellus volutpat fringilla cursus. Ut sed vehicula felis. In ligula erat, condimentum in feugiat id, interdum bibendum justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar eu leo sed interdum.



Integer leo nibh, fringilla lacinia justo et, tempus ornare urna. Aliquam ullamcorper nisl bibendum mi vestibulum porttitor. Etiam non volutpat diam. Mauris imperdiet dignissim mollis. Donec sagittis quam non mattis consequat. Aenean vitae est vehicula, convallis metus vel, consequat enim. Quisque rhoncus orci accumsan orci placerat, sit amet pretium leo placerat. Nam sit amet dictum dui. Aliquam erat volutpat. Curabitur rutrum sollicitudin dolor et gravida. Aenean faucibus placerat eros, eu elementum ipsum volutpat quis. Aenean pellentesque lacus sed nisl gravida mollis. Nam tincidunt libero vitae tellus ornare rhoncus. Mauris id hendrerit quam.

```
import React from "react";
```

```
class BlogPostTemplate extends React.Component {
```

```
  render() {
```

```
    const post = this.props.data.markdownRemark;
```

```
    return (
```

```
      <div>
```

```
        <h1>{post.frontmatter.title}</h1>
```

```
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
```

```
      </div>
```

```
    );
```

```
  }
```

```
}
```

```

```

```
export default BlogPostTemplate;
```

```

```

```
export const pageQuery = graphql`
```

```
  query BlogPostBySlug($slug: String!) {
```

```
    markdownRemark(fields: { slug: { eq: $slug } }) {
```

```
      html
```

```
      frontmatter {
```

```
        title
```

```
      }
```

```
    }
```

```
  }
```

```
`;
```

Etiam ac purus eget urna dignissim auctor a vitae arcu. In convallis mi vitae nulla rhoncus mollis. Integer eu leo neque. Sed rutrum blandit felis non finibus. In efficitur mauris magna, vitae facilisis nisi vehicula eget. Praesent nisi mi, vehicula nec fringilla at, euismod in turpis. Integer ultricies vel enim in dignissim. Nunc auctor nibh a ultrices pretium. Phasellus maximus turpis id ultrices aliquam. Etiam leo orci, consequat non euismod ut, rhoncus sit amet felis. Curabitur ut consequat tellus. Morbi lacinia vehicula posuere. Fusce at sem nunc.