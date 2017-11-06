#!/usr/bin/env python
# Name: Jesse Groot
# Student number: 11012579
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''

import csv
from pattern.web import URL, DOM

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

def main():
    url = URL(TARGET_URL)
    dom = DOM(url.download(cached=True))
    values = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, values)

def extract_tvseries(dom):
    allvalues = []
    # print dom.body.content
    for series in dom.by_tag("div.lister-list")[:10]:  # Top 5 reddit entries.
        for values in dom.by_tag("div.lister-item-content")[:4]:  # Top 5 reddit entries.
            # Title
            for title in values.by_tag("h3.lister-item-header")[1]:  # First <a class="title"> in entry.
                allvalues.add(plaintext(title.content))
            # Rating
            for rating in values.by_tag("div.inline-block ratings-imdb-rating")[1]:
                allvalues.add(plaintext(rating.content))
            # Genre
            for genre in values.by_tag("span.genre")[:]:
                allvalues.add(plaintext(genre.content))
            # Actors
            for stars in values.by_tag("p")[:]:
                starstotal = None
                for star in starts:
                    starstotal += ("- " + plaintext(star.content))
                allvalues.add(starstotal)
    return [titles, ratings, genres, actors]

def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors'])
    for i in range(10):
        writer.writerow([tvseries[0 + (i * 4)], tvseries[1 + (i * 4)]], tvseries[2 + (i * 4)], tvseries[3 + (i * 10)])

    # ADD SOME CODE OF YOURSELF HERE TO WRITE THE TV-SERIES TO DISK

if __name__ == "__main__":
    main()
