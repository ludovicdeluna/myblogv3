**body**
  ***wrapper***
    **header** ***page-header***
      .headline (background + txt)
      .headline-metas (hors flux)
        .photo-credits
          .photo-author
          .photo-links
        .article-category
    **section** .paged
      ***page-content***
        ***page-content-articles*** (float left)
          role=main
            { article
              article => content }
          **nav** .nav-pagination
        **aside** ***page-content-nav*** (relative -top pix)
          .pined
            .site-logo
            **nav** .nav-site
      **footer** .article-about
  **footer** ***page-footer***
    .site-about .paged
    .site-links .paged


  {}
  #page-header
    .headline
    .metas (hors flux)
    .photo-credits
    .article-category

  article
    .metas

  .metas-posted_at
  .metas-placeline

  .article-category
  .article-tags
  .article-links
  .article-about

  .featured-content
  .featured-photo
  .photo-credits
    .about-author
    .about-link
  .site-about
    .about-author
    .about-link
