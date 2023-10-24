# MTLD, HDD, MSTTR arvutamine
import math


def mtld_calc(word_array, ttr_threshold):
    current_ttr = 1.0
    token_count = 0
    type_count = 0
    types = set()
    factors = 0.0

    for token in word_array:
        token = token.text.lower()
        token_count = token_count + 1
        if token not in types:
            type_count = type_count + 1
            types.add(token)
        current_ttr = type_count / token_count
        if current_ttr <= ttr_threshold:
            factors = factors + 1
            token_count = 0
            type_count = 0
            types = set()
            current_ttr = 1.0

    excess = 1.0 - current_ttr
    excess_val = 1.0 - ttr_threshold
    factors += excess / excess_val
    if factors != 0:
        return len(word_array) / factors
    return -1


# combination of n by r:  nCr = n! / r!(n - r)!
def combination(n, r):
    return math.comb(int(n), int(r))


# hypergeometric probability: the probability that an n-trial hypergeometric experiment results
#  in exactly x successes, when the population consists of N items, k of which are classified as successes.
#  (here, population = N, population_successes = k, sample = n, sample_successes = x)
#  h(x; N, n, k) = [ kCx ] * [ N-kCn-x ] / [ NCn ]
def hypergeometric(population, population_successes, sample, sample_successes):
    x = combination(population_successes, sample_successes)
    y = combination(population - population_successes, sample - sample_successes)
    z = combination(population, sample)

    try:
        return (x * y) / z
    except:
        raise ValueError("Error while computing hypergeometric probability")


# HD-D implementation
def hdd(word_array, sample_size = 42):
    if isinstance(word_array, str):
        raise ValueError("Input should be a list of strings, rather than a string. Try using string.split()")
    # if len(word_array) < 50:
    #     raise ValueError("Input word list should be at least 50 in length")

    # Create a dictionary of counts for each type
    type_counts = {}
    for token in word_array:
        token = token.text.lower() # make lowercase
        if token in type_counts:
            type_counts[token] = type_counts[token] + 1
        else:
            type_counts[token] = 1

    # Sum the contribution of each token - "If the sample size is 42, the mean contribution of any given
    #  type is 1/42 multiplied by the percentage of combinations in which the type would be found." (McCarthy & Jarvis 2010)

    hdd_value = 0
    for token_type in type_counts.keys():
        contribution = (1 - hypergeometric(len(word_array), sample_size, type_counts[token_type], 0)) / sample_size
        hdd_value = hdd_value + contribution

    return hdd_value


def safe_divide(numerator, denominator):
    if denominator == 0 or denominator == 0.0:
        index = 0
    else:
        index = numerator / denominator
    return index


def msttr(text, window_length=50):
    if len(text) < (window_length + 1):
        ms_ttr = safe_divide(len(set(text)), len(text))

    else:
        sum_ttr = 0
        denom = 0

        n_segments = int(safe_divide(len(text), window_length))
        seed = 0
        for x in range(n_segments):
            sub_text = text[seed:seed + window_length]
            # print sub_text
            sum_ttr = sum_ttr + safe_divide(len(set(sub_text)), len(sub_text))
            denom = denom + 1
            seed = seed + window_length

        ms_ttr = safe_divide(sum_ttr, denom)

    return ms_ttr


indexes_in = "A2	keskmine	3.4192	4.8355	0.029	36.1663	64.1768	0.7962	0.3524|\
A2	standardh	0.3077	0.4352	0.0055	9.5526	32.2984	0.0627	0.0162|\
B1	keskmine	4.0518	5.73	0.0313	33.3082	86.8574	0.8214	0.3553|\
B1	standardh	0.5095	0.7205	0.0061	7.1039	36.163	0.0486	0.0112|\
B2	keskmine	4.9551	7.0075	0.0291	35.3632	141.1916	0.874	0.3531|\
B2	standard	0.5194	0.7346	0.0047	6.2512	49.1703	0.0321	0.0105|\
C1	keskmine	6.4098	9.0649	0.0255	40.9511	244.274	0.9124	0.3508|\
C1	standardh	0.6864	0.9707	0.0051	9.1503	72.52	0.0207	0.0062"


class IndValues:
    def __init__(self, txtLevel, KLSS_m, JLSS_m, MAAS_m, UBER_m, MTLD_m, HDD_m, MSTTR_m, KLSS_d, JLSS_d, MAAS_d, UBER_d,
                 MTLD_d, HDD_d, MSTTR_d):
        self.txtLevel = txtLevel
        self.KLSS_m = KLSS_m
        self.JLSS_m = JLSS_m
        self.MAAS_m = MAAS_m
        self.UBER_m = UBER_m
        self.MTLD_m = MTLD_m
        self.HDD_m = HDD_m
        self.MSTTR_m = MSTTR_m
        self.KLSS_d = KLSS_d
        self.JLSS_d = JLSS_d
        self.MAAS_d = MAAS_d
        self.UBER_d = UBER_d
        self.MTLD_d = MTLD_d
        self.HDD_d = HDD_d
        self.MSTTR_d = MSTTR_d


# teksti hindamise tulemuse struktuur
class IndResult:
    def __init__(self, txtLevel, KLSS, JLSS, MAAS, UBER, MTLD, HDD, MSTTR, KLSS_d, JLSS_d, MAAS_d, UBER_d, MTLD_d,
                 HDD_d, MSTTR_d):
        self.txtLevel = txtLevel
        self.KLSS = KLSS
        self.JLSS = JLSS
        self.MAAS = MAAS
        self.UBER = UBER
        self.MTLD = MTLD
        self.HDD = HDD
        self.MSTTR = MSTTR
        self.KLSS_d = KLSS_d
        self.JLSS_d = JLSS_d
        self.MAAS_d = MAAS_d
        self.UBER_d = UBER_d
        self.MTLD_d = MTLD_d
        self.HDD_d = HDD_d
        self.MSTTR_d = MSTTR_d


text_indexes_lines = indexes_in.split('|')
IndArray = []
line_data = []
for j in range(0, len(text_indexes_lines)):
    line = text_indexes_lines[j]
    line_data = line.split(chr(9))

    if line_data[1][0:4] == "kesk":
        c1 = IndValues(line_data[0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        c1.KLSS_m = float(line_data[2])
        c1.JLSS_m = float(line_data[3])
        c1.MAAS_m = float(line_data[4])
        c1.UBER_m = float(line_data[5])
        c1.MTLD_m = float(line_data[6])
        c1.HDD_m = float(line_data[7])
        c1.MSTTR_m = float(line_data[8])
    else:
        if line_data[0] == c1.txtLevel:
            c1.KLSS_d = float(line_data[2])
            c1.JLSS_d = float(line_data[3])
            c1.MAAS_d = float(line_data[4])
            c1.UBER_d = float(line_data[5])
            c1.MTLD_d = float(line_data[6])
            c1.HDD_d = float(line_data[7])
            c1.MSTTR_d = float(line_data[8])
            IndArray.append(c1)
        else:
            raise ValueError("[Viga indeksite importimisel {} tase: vale maatriksi struktuur]", c1.txtLevel)

print(IndArray)


def mitmekesisus_kaugused(KLSS, JLSS, MAAS, UBER, MTLD, HDD, MSTTR):
    ResultArray = []
    for j in range(0, len(IndArray)):
        c1 = IndResult(IndArray[j].txtLevel, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)

        if KLSS < IndArray[j].KLSS_m - IndArray[j].KLSS_d:
            c1.KLSS_d = round(abs(KLSS - (IndArray[j].KLSS_m - IndArray[j].KLSS_d)), 4)
        else:
            if KLSS >= IndArray[j].KLSS_m + IndArray[j].KLSS_d:
                c1.KLSS_d = round(abs(KLSS - (IndArray[j].KLSS_m + IndArray[j].KLSS_d)), 4)
            else:
                if KLSS >= IndArray[j].KLSS_m - IndArray[j].KLSS_d and KLSS < IndArray[j].KLSS_m + IndArray[j].KLSS_d:
                    c1.KLSS = 1

        if JLSS < IndArray[j].JLSS_m - IndArray[j].JLSS_d:
            c1.JLSS_d = round(abs(JLSS - (IndArray[j].JLSS_m - IndArray[j].JLSS_d)), 4)
        else:
            if JLSS >= IndArray[j].JLSS_m + IndArray[j].JLSS_d:
                c1.JLSS_d = round(abs(JLSS - (IndArray[j].JLSS_m + IndArray[j].JLSS_d)), 4)
            else:
                if JLSS >= IndArray[j].JLSS_m - IndArray[j].JLSS_d and JLSS < IndArray[j].JLSS_m + IndArray[j].JLSS_d:
                    c1.JLSS = 1

        if MAAS < IndArray[j].MAAS_m - IndArray[j].MAAS_d:
            c1.MAAS_d = round(abs(MAAS - (IndArray[j].MAAS_m - IndArray[j].MAAS_d)), 4)
        else:
            if MAAS >= IndArray[j].MAAS_m + IndArray[j].MAAS_d:
                c1.MAAS_d = round(abs(MAAS - (IndArray[j].MAAS_m + IndArray[j].MAAS_d)), 4)
            else:
                if MAAS >= IndArray[j].MAAS_m - IndArray[j].MAAS_d and MAAS < IndArray[j].MAAS_m + IndArray[j].MAAS_d:
                    c1.MAAS = 1

        if UBER < IndArray[j].UBER_m - IndArray[j].UBER_d:
            c1.UBER_d = round(abs(UBER - (IndArray[j].UBER_m - IndArray[j].UBER_d)), 4)
        else:
            if UBER >= IndArray[j].UBER_m + IndArray[j].UBER_d:
                c1.UBER_d = round(abs(UBER - (IndArray[j].UBER_m + IndArray[j].UBER_d)), 4)
            else:
                if UBER >= IndArray[j].UBER_m - IndArray[j].UBER_d and UBER < IndArray[j].UBER_m + IndArray[j].UBER_d:
                    c1.UBER = 1

        if MTLD < IndArray[j].MTLD_m - IndArray[j].MTLD_d:
            c1.MTLD_d = round(abs(MTLD - (IndArray[j].MTLD_m - IndArray[j].MTLD_d)), 4)
        else:
            if MTLD >= IndArray[j].MTLD_m + IndArray[j].MTLD_d:
                c1.MTLD_d = round(abs(MTLD - (IndArray[j].MTLD_m + IndArray[j].MTLD_d)), 4)
            else:
                if MTLD >= IndArray[j].MTLD_m - IndArray[j].MTLD_d and MTLD < IndArray[j].MTLD_m + IndArray[j].MTLD_d:
                    c1.MTLD = 1

        if HDD < IndArray[j].HDD_m - IndArray[j].HDD_d:
            c1.HDD_d = round(abs(HDD - (IndArray[j].HDD_m - IndArray[j].HDD_d)), 4)
        else:
            if HDD >= IndArray[j].HDD_m + IndArray[j].HDD_d:
                c1.HDD_d = round(abs(HDD - (IndArray[j].HDD_m + IndArray[j].HDD_d)), 4)
            else:
                if HDD >= IndArray[j].HDD_m - IndArray[j].HDD_d and HDD < IndArray[j].HDD_m + IndArray[j].HDD_d:
                    c1.HDD = 1

        if MSTTR < IndArray[j].MSTTR_m - IndArray[j].MSTTR_d:
            c1.MSTTR_d = round(abs(MSTTR - (IndArray[j].MSTTR_m - IndArray[j].MSTTR_d)), 4)
        else:
            if MSTTR >= IndArray[j].MSTTR_m + IndArray[j].MSTTR_d:
                c1.MSTTR_d = round(abs(MSTTR - (IndArray[j].MSTTR_m + IndArray[j].MSTTR_d)), 4)
            else:
                if MSTTR >= IndArray[j].MSTTR_m - IndArray[j].MSTTR_d and MSTTR < IndArray[j].MSTTR_m + IndArray[
                    j].MSTTR_d:
                    c1.MSTTR = 1

        ResultArray.append(c1)
    print(ResultArray)
    vastus = []
    ResultArray.sort(key=lambda x: x.KLSS_d, reverse=False)
    print("KLSS järgi teksti tase: " + ResultArray[0].txtLevel)
    vastus.append(ResultArray[0].txtLevel)

    ResultArray.sort(key=lambda x: x.JLSS_d, reverse=False)
    print("JLSS järgi teksti tase: " + ResultArray[0].txtLevel)
    vastus.append(ResultArray[0].txtLevel)

    ResultArray.sort(key=lambda x: x.MTLD_d, reverse=False)
    print("MTLD järgi teksti tase: " + ResultArray[0].txtLevel)
    vastus.append(ResultArray[0].txtLevel)
    return vastus


mitmekesisus_kaugused(2.1355, 3.02, 0.07, 13.46, 77.33, 0.70, 0.34)
