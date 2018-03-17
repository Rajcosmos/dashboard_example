import os
import pandas as pd

def samplefunc(y):

        df = pd.read_csv("belly_button_biodiversity_samples.csv", dtype=object)
        x=y
        df=df.sort_values(by=[x,'otu_id'], ascending=[0,1])
        samplevalue=df[x].dropna().tolist()
        otu=df['otu_id'].dropna().tolist()
        a={}
        key = 'sample_values'
        a.setdefault(key, [])
        for i in samplevalue:
            a[key].append(i)
        key = 'otu_ids'
        a.setdefault(key, [])
        for i in otu:
            a[key].append(i)
        return a



