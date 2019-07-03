// const n = 4;
const INF = 1e9+7;
// const d = [[],[0,0,10,15,20,22],[0,10,0,35,25,13],[0,15,35,0,30,14],[0,20,25,30,0,19],[0,22,13,14,19,0]];

/**
 * return Optimal Hamiltonian tour
 * @author Seyed Mohammad Moghadas
 * @returns {Array} result - {integer} result[0]: weight of optimal path , {array} result[1]: optimal path
 * @param {number} n - Number of vertexes in input graph
 * @param {Array} d - adjacency matrix of graph
 */
function tsp(n , d) {
    var C = {};
    var Par = {}
    C[[[1],1]] = 0;
    var vertexe_list = [];
    for (let i = 2; i <= n; i++) {
        // vertexes.add(i);
        vertexe_list.push(i);
    }
    // console.log(subset(vertexe_list,3)); 
    for (let s = 2; s <= n; s++) {
        let sub_sets = subset(vertexe_list,s-1);
        sub_sets.forEach(element => {
            C[[element,1]] = INF;
            element.forEach(j=>{
                if(j!==1){
                    C[[element,j]] = INF;
                }
            });
        });
        sub_sets.forEach(element =>{
            element.forEach(j=>{
                if(j!==1){
                    element.forEach(i => {
                        if (i!=j) {
                            var rems = [...element];
                            rems.splice(rems.indexOf(j),1);
                            // C[[element,j]] = Math.min(C[[element,j]],C[[rems,i]]+d[i][j]);
                            if(C[[rems,i]]+d[i][j] < C[[element,j]]){
                                C[[element,j]] = C[[rems,i]]+d[i][j];
                                Par[[element,j]] = i;
                            }  
                        }
                    });
                }
            });
        });
        
    }
    var res = INF;
    var final_vertexe_list = [];
    for (let i = 0; i < n; i++) {
        final_vertexe_list.push(i+1);
    }
    final_vertexe_list.forEach(element => {
        if (element!==1) {
            if (C[[final_vertexe_list,element]]+d[element][1] < res) {
                res = C[[final_vertexe_list,element]]+d[element][1];
                Par[[final_vertexe_list]] = element;            
            }
            res = Math.min(res,C[[final_vertexe_list,element]]+d[element][1]);
            // console.log("RES=",res,final_vertexe_list);
        }
    });
    var Path = [Par[final_vertexe_list]];
    var _ini = [[final_vertexe_list,Par[final_vertexe_list]]];
    
    for (let index = 0; index < n-1; index++) {
        var last = Par[_ini];
        Path.push(Par[_ini]);
        // console.log(_ini,Par[_ini]);
        _ini[0][0].splice(_ini[0][0].indexOf(_ini[0][1]),1);
        var seen = _ini[0][0]; 
        _ini =[[seen,last]]
        
    }
    // console.log(Path);
    var corr_path = [];
    for (let index = n-1; index >= 0; index--) {
        corr_path.push(Path[index]);
    }  
    console.log(corr_path);
     
    return [res,corr_path];
    
}

/**
 * @returns if Set as is equal to Set bs returns true else return false
 * @param {Set} as 
 * @param {Set} bs 
 */
function eqSet(as, bs) {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
}

/**
 * @returns all subsets of a set with size s and containing 1
 * @param {Array} S - input set 
 * @param {number} val_size - size of subsets minus 1 !
 */
function subset(S,val_size){
    let subsets = {}
    for (let sz = 1; sz <= S.length; sz++) {
        subsets[sz] =[]
    }
    for(var i =0; i< (1<<S.length) ; i++){
        let size = 0;
        let s = [1]
        for (let j = 0; j < S.length; j++) {
            if ((i&(1<<j))>0) {
                size++;
                s.push(S[j]);
            }
        }
        if (size>0) {
            subsets[size].push(s);            
        }
    }
    // console.log(subsets);
    // let valid = {};
    for (var key in subsets) {
        if (subsets.hasOwnProperty(key)) {
            if(parseInt(key)===parseInt(val_size))
                return subsets[key];
        }
    } 

}
console.log(tsp());
// console.log(JSON.stringify(C),Object.keys(C).length);
// console.log(Par);

